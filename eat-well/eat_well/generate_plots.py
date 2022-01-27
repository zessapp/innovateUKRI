import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
import pandas as pd


def generate_plots(df, n1, n2, n3, n4):

    fig, axes = plt.subplots(nrows=2, ncols=2, figsize=(15, 15))

    ax1 = df.plot(ax=axes[0, 0], y=n1, use_index=True,
                  title='{} in (g) for Ranked Menu Items.'.format(n1))
    ax2 = df.plot(ax=axes[0, 1], y=n2, use_index=True,
                  title='{} in (mg) for Ranked Menu Items.'.format(n2))
    ax3 = df.plot(ax=axes[1, 0], y=n3, use_index=True,
                  title='{} in (g) for Ranked Menu Items.'.format(n3))
    ax4 = df.plot(ax=axes[1, 1], y=n4, use_index=True,
                  title='{} in (mg) for Ranked Menu Items.'.format(n4))

    ax1.set_xlabel("Rank Index")
    ax1.set_ylabel("{} (g)".format(n1))
    ax1.grid('on')
    ax2.set_xlabel("Rank Index")
    ax2.set_ylabel("{} (mg)".format(n2))
    ax2.grid('on')
    ax3.set_xlabel("Rank Index")
    ax3.set_ylabel("{} (g)".format(n3))
    ax3.grid('on')
    ax4.set_xlabel("Rank Index")
    ax4.set_ylabel("{} (g)".format(n4))
    ax4.grid('on')
